"use client";

import axios from "axios";
import { useState } from "react";
import { useModal } from "@/hooks/use-modal";

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export const ProModal = () => {
  const { isOpen, onOpen, onClose, type } = useModal();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const isModalOpen = isOpen && type === "pro";

  const onSubscribe = async () => {
    try {
      setLoading(true);

      const response = await axios.get("api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-center">Upgrade to Pro</DialogTitle>
          <DialogDescription className="text-center space-y-2">
            Create <span className="text-sky-500 font-medium">Custom AI</span>{" "}
            Companions
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="flex justify-between">
          <p className="text-2xl font-medium">
            $9
            <span className="text-sm font-normal">.99/month</span>
          </p>
          <Button onClick={onSubscribe} disabled={loading} variant="premium">
            Subscribe
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
