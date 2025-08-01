import { supabase } from '../supabase'

const RegisterId = async (File: File, formData: any) => {
  const userInformationItems = []

  const fileExt = File.name.split('.').pop()
  const filePath = `RegisterPhoto/${fileExt}`

  const { data: uploadPhoto, error: uploadError } = await supabase.storage
    .from('Templates')
    .upload(filePath, File, {
      cacheControl: '3600',
      upsert: true,
    })

  const { data: publicImageUrl } = supabase.storage.from('Templates').getPublicUrl(filePath)

  if (!publicImageUrl.publicUrl) {
    return {
      status: 500,
      msg: 'Image not found',
    }
  }

  const userInformation = {
    ...formData,
    photo: publicImageUrl.publicUrl,
  }

  userInformationItems.push(userInformation)

  const { data: loadSchoolData, error: loadError } = await supabase
    .from('Orders')
    .select('*')
    .eq('school', formData.school)
    .eq('section', formData.section)

  if (loadError) {
    return {
      status: 500,
      msg: loadError.message,
    }
  }

  const loadDataItems = loadSchoolData.map((items: { item: any[] }) => items.item)

  userInformationItems.push(loadDataItems)

  const { error: updateError } = await supabase
    .from('Orders')
    .update({
      item: userInformation,
    })
    .eq('id', loadSchoolData[0].id)
}

export { RegisterId }
