import Image from "next/image";
import LearnProps from "./(components)/Practise/learnProps";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <p>FULLSTACK APP USING MONGODB , NEXT JS , PRISMA</p>
      <LearnProps name="Hlalele Maroba" gender="male" phoneNumber="56891234" />
    </main>
  );
}
