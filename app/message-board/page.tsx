'use client'

import MessageBoard from "@/components/MessageBoard";

export default function Page() {
   return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", alignItems: "center" }}>
         <div style={{ fontSize: "2rem", margin: "1rem" }}>Message Board</div>
         <MessageBoard />
      </div>
   );
}