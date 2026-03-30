import Link from "next/link";

const aaa: string[] = [];
// import { signup } from "@/app/actions/auth";
export default function Home() {
  return (
    <div className="justify-center flex flex-col items-center">
      {/* <form action={signup}> */}
      <div className=" w-full flex justify-center">
        <div className="">
            fyll inn innledende tekst hær
            <div>test</div>
        </div>
      </div>
      <div className="flex justify-around w-full pt-5 break-all *:w-28 *:py-2 *:rounded-md *:text-center">
        <div className="">
          <div className="flex justify-center">
            <Link href={"/about/student"} className="bg-white text-black w-fit hover:bg-purple-400 transition-all duration-200 rounded-md p-2 mb-2">
              Students
            </Link>
          </div>
        </div>
        <div>
          <div className="flex justify-center">
            <Link href={"/about/teacher"} className="bg-white text-black w-fit hover:bg-purple-400 transition-all duration-200 rounded-md p-2 mb-2">
              Teachers
            </Link>
          </div>
        </div>
        <div>
          <div className="flex justify-center">
            <Link
              href={"/about/university"}
              className="bg-white text-black w-fit hover:bg-purple-400 transition-all duration-200 rounded-md p-2 mb-2"
            >
              Universitet
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full mt-5 min-h-[20vh] border-2 rounded-md">weeewooo</div>
      {/* </form> */}
    </div>
  );
}
