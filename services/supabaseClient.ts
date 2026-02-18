import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lfwvhfncegshxuljwppc.supabase.co';
const supabaseKey = 'sb_publishable_QLaoz-qgZfRg9Vm2HeNLRw_xGtd2LED';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Função auxiliar para registrar analytics
export const trackEvent = async (eventType: string) => {
  try {
    await supabase.from('analytics_geminadas').insert({ event_type: eventType });
  } catch (error) {
    console.error('Erro ao registrar analytics', error);
  }
};