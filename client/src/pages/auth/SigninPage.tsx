"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";

export const SigninPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="grid gap-6">
      <div className="flex flex-col items-center justify-center">
        <Input
          placeholder="Email"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>
          {name}, {password}
        </p>
        <Button
          className="theme-btn"
          onClick={() =>
            toast("Event has been created", {
              description: `${new Date()}`,
              action: {
                label: "Hello",
                onClick: () => console.log("Hello"),
              },
            })
          }
        >
          Click me
        </Button>
      </div>
    </div>
  );
};
