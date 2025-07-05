// src/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ayrgswttvlsujrhptszj.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5cmdzd3R0dmxzdWpyaHB0c3pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3MDk2MzMsImV4cCI6MjA2NzI4NTYzM30.Rsmkjq8N6BoRPk_gWjyxoQvypsCoiz_hxUbSD9WE6zM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
