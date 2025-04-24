import axios from "axios";

export async function GetProvinces() {
  try {
    const response = await axios.get('/api/region/provinces');
    return response.data.data;
  } catch (error: any) {
    throw error.response?.data || { error: "Something went wrong" };
  }
}


export async function GetKabupatenByProvince(provinceId: string) {
  try {
    const response = await axios.get(`/api/region/kabupaten/${provinceId}`);
    return response.data.data;
  } catch (error: any) {
    throw error.response?.data || { error: "Something went wrong" };
  }
}
export async function GetKecamatan(kabId: string) {
  try {
    const response = await axios.get(`/api/region/kecamatan/${kabId}`);
    return response.data.data;
  } catch (error: any) {
    throw error.response?.data || { error: "Something went wrong" };
  }
}
export async function GetKelurahan(kecId: string) {
  try {
    const response = await axios.get(`/api/region/kelurahan/${kecId}`);
    return response.data.data;
  } catch (error: any) {
    throw error.response?.data || { error: "Something went wrong" };
  }
}



