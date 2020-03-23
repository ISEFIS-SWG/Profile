import React,{ useState } from 'react';
import { IonSegmentButton,IonSegment,IonContent,IonItem,IonIcon,useIonViewDidEnter,
  IonRefresher,IonRefresherContent ,IonPopover,IonButton,
  IonButtons, IonHeader, IonPage, IonTitle, IonToolbar,IonAvatar,IonLabel,
  IonCardContent,IonFooter,IonCardHeader,IonCard,IonList,IonRow,IonCol} from '@ionic/react';
import { RefresherEventDetail } from '@ionic/core';
import { settings,person,walk,bicycle, stats } from 'ionicons/icons';
import { RouteComponentProps } from 'react-router';
import "../cssfile/profilecss.css";
import {  EmailShareButton,  FacebookShareButton,LineShareButton} from "react-share";
import { GetUesr} from '../service/UserAPI';
import {  EmailIcon,  FacebookIcon,   LineIcon,} from "react-share";
import shareValue from "../models/share";


function doRefresh(event: CustomEvent<RefresherEventDetail>) {
  console.log('Begin async operation');

  setTimeout(() => {
    console.log('Async operation has ended');
    event.detail.complete();
  }, 2000);
}


const Tab3Page: React.FC<RouteComponentProps> = (props) => {

  const [segment, setSegment] = useState("all");
  const [ProfileArray, setProfileArray] = useState([]);
  const [Name, setName] = useState("");
  
  let user_id = "25400209";

  let startGetEUser = async () => {
    let result = await GetUesr(user_id); 
    console.log("tab3");
    setProfileArray(result?.data);

  }

  useIonViewDidEnter(()=>{ //เป็นการบังคับให้อ่านหรือทำงานสำหรับการเปิดครั้งแรกเท่านั้น
    startGetEUser();
  })



  let name = ProfileArray.map((contact:any)=>{
    return (
    //  shareValue.selected = contact; //share to another file 
    
    <IonLabel>{contact.Name}  {contact.Surname}</IonLabel>
   
      )
   });



   




  return (
    <IonPage>
    <IonHeader>
    <IonToolbar>
            
                <IonTitle> 
                <IonButtons>
                Profile
                </IonButtons>                
                </IonTitle>
              <IonButtons slot="end">
                   <IonButton icon-only onClick={()=>{props.history.push('/Setting')}}>
                   <IonIcon slot="icon-only" icon={settings} ></IonIcon>
                  </IonButton>

 
   
               </IonButtons>
   </IonToolbar>
        </IonHeader>


        
  <IonContent className={`outer-content`}>
      <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
        <IonRefresherContent
          pullingIcon="arrow-dropdown"
          pullingText="Pull to refresh"
          refreshingSpinner="circles"
          >
        </IonRefresherContent>
      </IonRefresher>
    
      
  
 
       
       <IonCard className="speaker-card">
        <IonCardContent class="outer-content" > 
        <IonList onClick={()=>{props.history.push("/Editprofile")}}>
         <IonRow>
             <IonCol>
                <IonItem  lines="none" >
                <IonAvatar class="avatartab3">  
                <img  src="http://www.precision-spine.com/wp-content/uploads/2015/09/person-icon.png" /> 
                </IonAvatar>      
                </IonItem>
             </IonCol>
          </IonRow>
          <IonRow>
              <IonCol>
                <IonItem lines="none" class="outer-content">
                  {name}
                </IonItem>
              </IonCol>
          </IonRow>
         
          <IonRow>
              <IonCol>
                <IonItem  lines="none"> 
                <IonIcon slot="start" icon={walk} color="primary"/>
                  10.5Km 
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem  lines="none"> 
                <IonIcon slot="start" icon={bicycle} color="primary"/>
                  <IonLabel  >57.6Km </IonLabel>
                </IonItem>
              </IonCol>
             
          </IonRow>

          </IonList>
         
        </IonCardContent>
        
        
        <IonCardContent >

        <IonList>
        <IonItem  lines="none">
        <IonIcon slot="start" icon={stats} color="primary"/>
            statistics
          </IonItem>

          <IonItem button  onClick={()=>{props.history.push("/Editprofile")}}>
              <h3>Your Ranking      130 </h3>
            </IonItem>
            <IonItem button   onClick={()=>{props.history.push("/Editprofile")}}>
              <h3>All KM. </h3>
            </IonItem>
            <IonItem button   onClick={()=>{props.history.push("/Editprofile")}}>
              <h3>Last Activity </h3>
            </IonItem>
          </IonList>
          
        </IonCardContent>



      </IonCard>
      
 

</IonContent>


   <IonFooter >
   
   <IonToolbar class="ion-text-center" >
   <FacebookShareButton  url="https://www.facebook.com/tataez.nameofgod">
   <IonLabel  class="ion-text-center" ><FacebookIcon size={30} round={true}  /></IonLabel>
    </FacebookShareButton>
    
     <LineShareButton url="https://www.facebook.com/tataez.nameofgod">
     <LineIcon size={30} round={true}  />
     </LineShareButton>
     </IonToolbar>
     
  
   


</IonFooter>  
</IonPage>
  );
};

export default Tab3Page;
