"use client"

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface MessageCardProps {
  title: string;
  description: string;
  imgSrc: string;
  btnText: string;
  onBtnClick: () => void;
  btnDisabled?: boolean;
}

export default function MessageCard({
  title,
  description,
  imgSrc,
  btnText,
  onBtnClick,
  btnDisabled = false,
}: MessageCardProps) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8">
        <Card className="max-w-md w-full p-6">
          <Image src={imgSrc} alt={title} width={500} height={300} className="mb-3" />
          <CardHeader className="space-y-1 text-center">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              className="w-full"
              onClick={onBtnClick}
              disabled={btnDisabled}
            >{btnText}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}