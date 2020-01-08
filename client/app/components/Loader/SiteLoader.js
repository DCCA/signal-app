import React from "react"
import Loader from 'react-loader-spinner'

export default function SiteLoader (props){
 //other logic
    return(
       <div>
         <Loader
               className='loader'
               type="Grid"
               color="#14ffec"
               height={60}
               width={60}
               timeout={3000} //3 secs
         />
         <p 
            clasName='loader-text' 
            style={{
               color: '#14ffec'
         }}>loading...</p>
     </div>
    )
}