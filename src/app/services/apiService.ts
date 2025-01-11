import { getAccessToken, getRefreshToken } from "../lib/actions";

const apiService = {
    get: async function (url:string): Promise<any> {
        try {
            const token = await getAccessToken()
            
            const headers: HeadersInit = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            };

            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'GET',
                headers: headers,
            });

            // Check for response status
            if (!response.ok) {
                const errorText = await response.text(); // Log raw response for debugging
                console.error(`Error ${response.status}: ${errorText}`);
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            // Parse and return JSON if response is OK
            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    },
    postWithoutToken: async function (url: string, data: any, isFormData = false): Promise<any> {
        try {
            const headers: { [key: string]: string } = {
                Accept: 'application/json',
            };
    
            let body;
    
            if (isFormData) {
                body = data; // FormData
            } else {
                headers['Content-Type'] = 'application/json';
                body = JSON.stringify(data); // JSON string
            }
    
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'POST',
                headers,
                body,
            });
    
            const responseData = await response.json();
    
            if (!response.ok) {
                throw {
                    status: response.status,
                    message: responseData.message || 'Request failed',
                    errors: responseData, // Include the entire response as `errors`
                };
            }
    
            return {
                status: response.status,
                ...responseData,
            };
        } catch (error) {
            console.error('Error in postWithoutToken:', error);
            throw error;
        }
    },
    
    put: async function (
        url: string,
        data: any,
        isFormData = false
    ): Promise<any> {
        try {
            let token = await getAccessToken()
            if (!token) {
                throw 'Not authorized!'
            }
            const headers: HeadersInit = {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            };
    
            const body = isFormData ? data : JSON.stringify(data);
    
            if (!isFormData) {
                headers['Content-Type'] = 'application/json';
            } 

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'PUT',
                headers,
                body,
            });
    
            const responseData = await response.json();
    
            if (!response.ok) {
                throw {
                    status: response.status,
                    message: responseData.message || 'Request failed',
                    errors: responseData, // Include the entire response as `errors`
                };
            }
    
            return {
                status: response.status,
                ...responseData,
            };
        } catch (error) {
            console.error('Error in put:', error);
            throw error;
        }
    },
    
      
}

export default apiService