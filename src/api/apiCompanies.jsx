import supabaseClient, { supabaseUrl } from "@/utils/supabase";


export async function getCompanies(token) {
console.log('getcompanies called----------------');

    const supabase = await supabaseClient(token);

    const {data, error} = await supabase.from('companies').select('*');

    if(error){
        console.log('Error fetching companies:: ',error);
        return null;
    }
    // console.log('company data ::',data);
    

    return data;
    
}

export async function addNewCompany(token, _, companyData) {

  console.log('-----------addNewCompany called----------------');
    const supabase = await supabaseClient(token);
  
    const random = Math.floor(Math.random() * 90000);
    const fileName = `logo-${random}-${companyData.name}`;
  
    const { error: storageError } = await supabase.storage
      .from("company-logo")
      .upload(fileName, companyData.logo);
  
    if (storageError) throw new Error("Error uploading Company Logo");
  
    const logo_url = `${supabaseUrl}/storage/v1/object/public/company-logo/${fileName}`;
  
    const { data, error } = await supabase
      .from("companies")
      .insert([
        {
          name: companyData.name,
          logo_url: logo_url,
        },
      ])
      .select();
  
    if (error) {
      console.error(error);
      throw new Error("Error submitting Companys");
    }

    console.log('add new company data ::',data);
  
    return data;
  }