
export default {
    
    emailRegex : /^([a-zA-Z0-9]{1,})+([.]?[a-zA-Z0-9])+@\w+([.-]?\w+)*(\.[a-zA-Z]{2,6}[.]?)+$/,
    numRegex :  /^[0-9\-+\s]+$/,
    passwordRegex:/^[a-zA-Z0-9!@#$%^&*]{6,16}$/,

    validate(value, rule) {

       
        if (rule == null || rule === undefined || rule === "" || rule === 'undefined') {
         
            console.log(" rule invalid data: "+ rule)

        }




        // if (value == null || value === undefined || value === "" || value === 'undefined') {
         
        //     console.log("value invalid data: "+value)
               
        // // Assuming 'value' is passed as an argument to the function
        // return false;

        // }

 
// try{

    
console.log("core check :"+ rule.test(value))
        return rule.test(value);
       

         
    // }catch(err){

        
        
    //     return false
    // }

}



};

