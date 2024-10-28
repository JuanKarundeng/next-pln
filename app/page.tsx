import Login from "./(auth)/login/page";

export default function Home() {
  return (
    <div className="max-w-screen-xl mx-auto py-6 p-4">
      <div className="  flex justify-center items-center">
        {" "}
        <Login />
      </div>
    </div>
  );
}
