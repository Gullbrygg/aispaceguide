import Link from "next/link";

// import { signup } from "@/app/actions/auth";
export default function Bleh() {
    return (
        <div className="justify-center flex flex-col items-center bg-gray-200 min-h-full width-limit">
            {/* <form action={signup}> */}
            <div className="flex justify-around gap-14 pt-5 break-all [&>*]:min-w-56 [&>*]:h-[55vh] [&>*]:py-2 [&>*]:border-2 [&>*]:rounded-md [&>*]:text-center">
                <div className="">
                    <div className="border-b-2 flex justify-center"><Link href={"/"} className="bg-white text-black w-fit hover:bg-purple-400 transition-all duration-200 rounded-md p-2 mb-2">Students</Link></div>
                    <p className="">Skriv tekst her: TEST...TEST...TEST...TEST...TEST...TEST...TEST...</p>
                </div>
                <div>
                    <div className="border-b-2 flex justify-center">
                        <Link href={"/"} className="bg-purple-600 w-fit rounded-md p-2 mb-2">Teachers</Link></div>
                    <p className="">Skriv tekst her: TEST...TEST...TEST...TEST...TEST...TEST...TEST...</p>
                </div>
                <div>
                    <div className="border-b-2 flex justify-center"><Link href={"/"} className="bg-purple-600 w-fit rounded-md p-2 mb-2">Universitet</Link></div>
                    <p className="">Skriv tekst her: TEST...TEST...TEST...TEST...TEST...TEST...TEST...</p>
                </div>
            </div>
            <div className="min-w-[84vw] mt-5 min-h-[20vh] border-2 rounded-md">

            </div>
            {/* </form> */}
        </div>
    );
}