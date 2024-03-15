export default {
    
    
         firstnameregex: /[A-Za-z]/,
         lastnameregex:/[A-Za-z]/,
         emailRegex: /^([a-zA-Z0-9]{1,})+([.]?[a-zA-Z0-9])+@\w+([.-]?\w+)*(\.[a-zA-Z]{2,6}[.]?)+$/,
 
      

    contact(value, rule) {

       
        // if (rule == null || rule === undefined || rule === "" || rule === 'undefined') {
         
        //     console.log(" rule invalid data: "+ rule)

        // }


    
console.log("core check :"+ rule.test(value))
        return rule.test(value);
  

}



};

