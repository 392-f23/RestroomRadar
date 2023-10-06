export const getApiData = ({url}) => {
    const xhttpr = new XMLHttpRequest(); 
    xhttpr.open('GET', url, true); 
    
    xhttpr.send(); 
    
    xhttpr.onload = () => { 
      if (xhttpr.status === 200) { 
          const response = JSON.parse(xhttpr.response);
          print(response);
          return response; 
      } else { 
          console.log("Data not accessed.");
      } 
    }; 
};