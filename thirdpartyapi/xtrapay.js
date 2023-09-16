const axios = require('axios');
//const  credentials = btoa('IKIAB23A4E2756605C1ABC33CE3C287E27267F660D61:secret')
const token = "sk_kswtg8lcnruvrfzlejavmpukb8hlzuii4beusfh";

const encrypt = (form) => {
    const option = {
      method:'post',
      url: 'https://mobile.xtrapay.ng/api/baas/test_encryption',
      headers: {
        authorization: `Bearer ${token}`,
        // 'User-Agent': 'app.bolebrationevents.com',
        'content-type': 'application/json',

      },
      data:form,
    };

   return axios(option);
  };

const cardpay =(form)=>{
    const option = {
        method:'post',
        url: 'https://mobile.xtrapay.ng/api/baas/initiate_payment',
        headers: {
        authorization: `Bearer ${token}`,
        // 'User-Agent': 'app.bolebrationevents.com',
          'content-type': 'application/json',

        },
        data:form,
      };

     return axios(option);

}


const otp =(form)=>{
    const option = {
        method:'post',
        url: 'https://mobile.xtrapay.ng/api/baas/confirm_otp',
        // url:'https://sandbox.interswitchng.com/collections/w/pay',
        headers: {
        authorization: `Bearer ${token}`,
          'content-type': 'application/json',
  
        },
        data:form,
      };
  
     return axios(option);
  
  }
  
  const resendotp =(form)=>{
    const option = {
        method:'post',
        url: 'https://mobile.xtrapay.ng/api/baas/resend_otp',
        // url:'https://sandbox.interswitchng.com/collections/w/pay',
        headers: {
        authorization: `Bearer ${token}`,
          'content-type': 'application/json',
  
        },
        data:form,
      };
  
     return axios(option);
  
  }

  module.exports={encrypt,cardpay,otp,resendotp};


    
