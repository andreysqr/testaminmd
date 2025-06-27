
import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={`p-3 w-full rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-500 ${className}`}
      {...props}
    />
  )
);
Input.displayName = "Input";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={`p-3 w-full rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-violet-500 ${className}`}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

export const Button = ({ children, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={`px-5 py-3 rounded-xl font-medium bg-violet-600 hover:bg-violet-700 transition text-white ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default function OnlineCemetery() {
  const router = useRouter();
  return (
    <div className="text-white bg-black min-h-screen font-sans">
      <div className="relative h-screen flex flex-col items-center justify-center text-center">
        <video autoPlay loop muted className="absolute w-full h-full object-cover z-0">
          <source src="/foggy-morning.mp4" type="video/mp4" />
        </video>
        <div className="z-10 bg-black/60 p-6 rounded-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-blue-400">Память в цифровом пространстве</h1>
          <p className="text-xl mb-6 text-white">Создайте онлайн-мемориал для дорогого человека</p>
          <Button onClick={() => router.push("/create")}>Создать мемориал</Button>
        </div>
      </div>
      <div className="py-8 px-4 bg-black text-center border-t border-white/20">
        <p className="text-white/70">Свяжитесь с нами: support@memoryspace.md</p>
      </div>
    </div>
  );
}

export function CreateMemorial() {
  const [fullName, setFullName] = useState("");
  const [dates, setDates] = useState("");
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    console.log({ fullName, dates, bio, photo });
  };

  return (
    <div className="min-h-screen bg-black text-white py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-violet-400">Создание мемориала</h1>
        <div className="space-y-6">
          <Input placeholder="ФИО" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <Input placeholder="Годы жизни (например, 1945 - 2020)" value={dates} onChange={(e) => setDates(e.target.value)} />
          <Textarea placeholder="Биография, история, воспоминания..." value={bio} onChange={(e) => setBio(e.target.value)} />
          <div>
            <label className="block mb-2 text-white">Загрузите фотографию:</label>
            <Input type="file" accept="image/*" onChange={handleFileChange} />
            {photo && <p className="mt-2 text-sm text-white/70">Выбрано: {photo.name}</p>}
          </div>
          <Button onClick={handleSubmit} className="w-full">Сохранить мемориал</Button>
        </div>
      </div>
    </div>
  );
}
