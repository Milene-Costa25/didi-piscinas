import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ituantmhjxtzevtmhkth.supabase.co'

const supabaseKey = 'sb_publishable_qryTTi_O41A5WXh0k4GYDg_9aOL8GDN'

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)