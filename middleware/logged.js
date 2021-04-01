/* eslint-disable prettier/prettier */
export default function(context) {
  if(process.client){
    
    if (context.store.getters.isAuthenticated) {
      console.log("loogedededeed")
      context.redirect("/dashboard");
    }
  }
}
  