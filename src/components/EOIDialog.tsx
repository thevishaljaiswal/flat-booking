import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useUnits } from "@/context/UnitsContext";
import { toast } from "sonner";

interface EOIDialogProps {
  unitNumber: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const EOIDialog = ({ unitNumber, open, onOpenChange, onSuccess }: EOIDialogProps) => {
  const { placeEOI } = useUnits();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !mobile.trim()) {
      toast.error("Please enter customer name and mobile number");
      return;
    }
    placeEOI(unitNumber, { name: name.trim(), mobile: mobile.trim(), email: email.trim() });
    toast.success(`${unitNumber} is on hold for 15 minutes`);
    setName("");
    setMobile("");
    setEmail("");
    onOpenChange(false);
    onSuccess?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Expression of Interest — {unitNumber}</DialogTitle>
          <DialogDescription>
            The unit will be held for 15 minutes. If it is not allocated within that time, it becomes
            available again.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="eoi-name">Customer name</Label>
            <Input id="eoi-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="eoi-mobile">Mobile</Label>
            <Input id="eoi-mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="10-digit mobile" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="eoi-email">Email (optional)</Label>
            <Input id="eoi-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit EOI &amp; hold 15 min</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EOIDialog;
