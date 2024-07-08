const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

console.log('Connecting to Supabase...');
const supabase = createClient(supabaseUrl, supabaseKey);

supabase
  .from('some_table') // Replace 'some_table' with your actual table name
  .select('*')
  .then((response) => {
    console.log('Supabase Connection Response:', response); // Log Supabase connection response
  })
  .catch((error) => {
    console.error('Supabase Connection Error:', error); // Log any errors during Supabase connection
  });

module.exports = supabase;
