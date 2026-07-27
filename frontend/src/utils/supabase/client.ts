import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://bmfbxhnmdyhbomlvtpjv.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_A9T02FFeF8bby_MAZqNerA_X0kV0Shj'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
