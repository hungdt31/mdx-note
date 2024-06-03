import Image from "next/image"
import image from "/public/images/me.jpg"
export default function Page(){
  return (
    <div className="flex items-center gap-5 flex-wrap justify-center">
      <div className="relative">
        <Image src={image} alt="GFG logo imported from public directory" width={400} className="avatar"/>
        <div className="box box-right-top"></div>
        <div className="box box-right-bottom"></div>
        <div className="box box-left-top"></div>
        <div className="box box-left-bottom"></div>
      </div>
      <div>
      <p>My name is <strong>Doan Tri Hung</strong>.</p>
      <p>I love coding and watching anime.</p>
      </div>
    </div>
  )
}