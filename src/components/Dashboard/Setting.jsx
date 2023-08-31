import React,{useState} from "react";
import { useSelector ,useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";

const Setting = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {tokenpara} = useSelector((state)=>state.auth)

    const profileImage = useSelector((state)=>state.profile.hey.image)
    const {hey} = useSelector((state)=>state.profile)
    const [profilePicture, setprofilePicture] = useState(profileImage)


    // jb ek file/image chaiye hoti then files[0] use krte agr multiple files hota hai toh 
    // e.target.file kuch nhi hota files hi use hota
    // createUrl mai bdl do file ko because backend mai url ke form mai hai
    const handleFileimage=(e)=>{
       const file = e.target.files[0]
       setprofilePicture(URL.createObjectURL(file))

    }





  return (
    <>
      {/* side vala flex-1 lelerha hai  */}
      <div className=" flex-1 overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <div>
            <h1 className="mb-14 text-3xl font-medium text-richblack-5">
              Edit Profile
            </h1>

            {/* update profile */}
            {/* bhar vala box  */}
            <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 md:p-8 md:px-12 px-3 py-3 text-richblack-5">
              {/* then andr part ko bich mai lekr ao */}
              <div className="flex items-center gap-x-4">
              {/* then flex kro profileimage and button */}
              <img className='aspect-square w-[78px] rounded-full object-cover'  src={profilePicture}></img>
              <div className='space-y-2'>
              <p>Change Profile Picture</p>
              <form >
            <div className='flex gap-3'>
              
            </div>
            </form>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
