/* eslint-disable prettier/prettier */
export default function(context) {
  if(process.client){
      context.store.dispatch("initAuth")
    };
}
