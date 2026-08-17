export async function getZoneFromPincode(pincode) {
  if (!pincode || pincode.length !== 6 || !/^\d{6}$/.test(pincode)) {
    throw new Error('Invalid pincode format');
  }

  // Attempt 1: Extremely fast global postal API
  try {
    const response = await fetch(`https://api.zippopotam.us/in/${pincode}`, { signal: AbortSignal.timeout(4000) });
    if (response.ok) {
      const data = await response.json();
      if (data.places && data.places.length > 0) {
        const place = data.places[0];
        
        // Formatting to title case
        const titleCase = (str) => {
          return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        };
        
        return {
          state: titleCase(place.state),
          city: titleCase(place['place name']),
          zone: titleCase(place['place name'])
        };
      }
    }
  } catch (error) {
    console.warn('Zippopotam API failed, falling back to Indian Postal API...', error.message);
  }

  // Attempt 2: Official Indian Postal API
  try {
    const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`, { signal: AbortSignal.timeout(5000) });
    const data = await response.json();

    if (!data || data.length === 0 || data[0].Status !== 'Success' || !data[0].PostOffice) {
      throw new Error('Pincode details not found');
    }

    const titleCase = (str) => {
      return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const state = titleCase(data[0].PostOffice[0].State);
    const district = titleCase(data[0].PostOffice[0].District);
    
    return {
      state,
      city: district,
      zone: district
    };
  } catch (error) {
    console.error('Error fetching pincode details:', error.message);
    throw new Error('Could not determine zone for the provided pincode');
  }
}
