// "use client";

// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import * as React from "react";
// import { format } from "date-fns";
// import { Calendar as CalendarIcon } from "lucide-react";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// function LaporanAdminPage() {
//   const [loading, setLoading] = useState(false);
//   const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [date, setDate] = React.useState<Date>();
//   return (
//     <>
//       <div className="flex items-center gap-2 text-secondaryColor dark:text-primaryColor font-bold text-3xl mb-5">
//         Laporan Keuangan
//       </div>
//       <div className="flex gap-4 justify-start items-start">
//         <div className="flex justify-between mb-2">
//           <div className="flex gap-2 w-full">
//             <div className="w-fit">
//               <Select>
//                 <SelectTrigger className="w-[130px] px-2 gap-2">
//                   <SelectValue placeholder="Pilih Dapur" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     <SelectItem value="Keseluruhan">Keseluruhan</SelectItem>
//                     <SelectItem value="Dapur1">Dapur 1</SelectItem>
//                     <SelectItem value="Dapur2">Dapur 2</SelectItem>
//                     <SelectItem value="Dapur3">Dapur 3</SelectItem>
//                     <SelectItem value="Dapur4">Dapur 4</SelectItem>
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="w-fit justify-between gap-2">
//               <div className="fit">
//                 <Popover>
//                   <PopoverTrigger asChild>
//                     <Button
//                       variant={"outline"}
//                       className={cn(
//                         "w-[280px] justify-start text-left font-normal",
//                         !date && "text-muted-foreground"
//                       )}
//                     >
//                       <CalendarIcon className="mr-2 h-4 w-4" />
//                       {date ? format(date, "PPP") : <span>Pick a date</span>}
//                     </Button>
//                   </PopoverTrigger>
//                   <PopoverContent className="w-auto p-0">
//                     <Calendar
//                       mode="single"
//                       selected={date}
//                       onSelect={setDate}
//                       initialFocus
//                     />
//                   </PopoverContent>
//                 </Popover>
//               </div>
//               <div className="fit">to</div>
//               <div className="fit"></div>
//             </div>
//           </div>
//         </div>
//         <div className="div"></div>
//         <div className="div"></div>
//       </div>
//     </>
//   );
// }

// export default LaporanAdminPage;
