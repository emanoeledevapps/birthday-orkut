interface ReturnProps {
  success: boolean;
  url: string;
}
export async function uploadFile(file: Blob | File): Promise<ReturnProps> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STORAGE_API_URL}/upload`,
      { method: 'POST', body: formData }
    );

    const json = await response.json()
    return {
      success: true,
      url: json?.url
    }
  } catch (e) {
    console.log(e)
    return {
      success: false,
      url: ""
    }
  }
}