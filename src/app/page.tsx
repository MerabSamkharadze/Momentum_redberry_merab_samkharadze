import Sort from "@/components/Sort";
import Card from "@/components/Card";
import { Task } from "@/components/Card";

export default function Home() {
  const testTask: Task = {
    id: 11,
    name: "Redberry-ს საიტის ლენდინგის დიზაინი ",
    description:
      "შექმენი საიტის მთავარი გვერდი, რომელიც მოიცავს მთავარ სექციებს, ნავიგაციას.",
    due_date: "2025-12-31T00:00:00Z",
    department: {
      id: 2,
      name: "ადმინისტრაციის დეპარტამენტი",
    },
    employee: {
      id: 11,
      name: "ნიკა",
      surname: "ნოკია",
      avatar:
        "https://momentum.redberryinternship.ge/storage/employee-avatars/tIEW1LDGmEEFQn30l3u0pwOoQ2PLjf5mqNdwdaLD.jpg",
      department: {
        id: 2,
        name: "ადამიანური რესურსების დეპარტამენტი",
      },
    },
    status: {
      id: 1,
      name: "დასაწყები",
    },
    priority: {
      id: 1,
      name: "დაბალი",
      icon: "https://momentum.redberryinternship.ge/storage/priority-icons/Low.svg",
    },
    total_comments: 2,
  };

  return (
    <main className="w-[1920px] px-[120px] py-[30px] bg-white ">
      <div className="justify-start text-[#212529] text-[34px] font-semibold font-sans">
        დავალებების გვერდი
      </div>
      <Sort />
      <Card task={testTask} />
    </main>
  );
}
