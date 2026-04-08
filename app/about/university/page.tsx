import Link from "next/link";

export default function University(){
    return (
      <>
        <div className="justify-center flex flex-col items-center bg-gray-200 min-h-full width-limit">
            {/* <form action={signup}> */}
            <div className="flex justify-around gap-14 pt-5 break-all [&>*]:min-w-56 [&>*]:h-[55vh] [&>*]:py-2 [&>*]:border-2 [&>*]:rounded-md [&>*]:text-center">
                <div className="">
                    <div className="border-b-2 flex justify-center">
                      <Link href={"/about/student"} className="bg-white text-black w-fit hover:bg-purple-400 transition-all duration-200 rounded-md p-2 mb-2">Students LENKE</Link></div>
                    <p className="">WEEEWOOO</p>
                </div>
                <div>
                    <div className="border-b-2 flex justify-center">
                        <Link href={"/about/teacher"} className="bg-white text-black w-fit hover:bg-purple-400 transition-all duration-200 rounded-md p-2 mb-2">Teachers LENKE</Link></div>
                    <p className="">IDK ANYMORE</p>
                </div>
                <div>
                    <div className="border-b-2 flex justify-center">
                      <Link href={"/about/university"} className="bg-white text-black w-fit hover:bg-purple-400 transition-all duration-200 rounded-md p-2 mb-2">Universitet LENKE</Link></div>
                    <p className="">¯\_(ツ)_/¯ Skriv tekst her eller noe : TEST...TEST...TEST...TEST...TEST...TEST...TEST...</p>
                </div>
            </div>
            <div className="w-full mt-5 min-h-[20vh] border-2 rounded-md">
              weeewooo
            </div>
            {/* </form> */}
        </div>
      </>  
    );
}