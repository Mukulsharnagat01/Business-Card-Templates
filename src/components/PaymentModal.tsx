import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { CreditCard, Wallet, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    itemName: string;
    price: string;
    onPaymentComplete?: () => void;
}

export const PaymentModal = ({
    isOpen,
    onClose,
    itemName,
    price,
    onPaymentComplete,
}: PaymentModalProps) => {
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [processing, setProcessing] = useState(false);
    const { toast } = useToast();

    const handlePayment = () => {
        setProcessing(true);
        // Simulate payment processing
        setTimeout(() => {
            setProcessing(false);
            toast({
                title: "Payment Successful!",
                description: `Your purchase of ${itemName} has been completed.`,
            });
            onPaymentComplete?.();
            onClose();
        }, 2000);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Complete Your Purchase</DialogTitle>
                    <DialogDescription>
                        You're about to purchase: <strong>{itemName}</strong>
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Price Display */}
                    <div className="bg-muted rounded-lg p-4 flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Total Amount</span>
                        <span className="text-2xl font-bold text-foreground">{price}</span>
                    </div >

                    {/* Payment Method Selection */}
                    < div className="space-y-3">
                        <Label > Select Payment Method</Label >
                        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                            <div className="flex items-center space-x-2 border border-border rounded-lg p-3 cursor-pointer hover:bg-muted/50">
                                <RadioGroupItem value="card" id="card" />
                                <Label
                                    htmlFor="card"
                                    className="flex items-center gap-2 cursor-pointer flex-1"
                                >
                                    <CreditCard className="w-4 h-4" />
                                    Credit / Debit Card
                                </Label>
                            </div >
                            <div className="flex items-center space-x-2 border border-border rounded-lg p-3 cursor-pointer hover:bg-muted/50">
                                < RadioGroupItem value="wallet" id="wallet" />
                                <Label
                                    htmlFor="wallet"
                                    className="flex items-center gap-2 cursor-pointer flex-1"
                                >
                                    <Wallet className="w-4 h-4" />
                                    Digital Wallet
                                </Label >
                            </div >
                        </RadioGroup >
                    </div >

                    {/* Card Details Form */}
                    {
                        paymentMethod === "card" && (
                            < div className="space-y-4 animate-fade-in">
                                < div className="space-y-2">
                                    < Label htmlFor="cardNumber">Card Number</Label>
                                    < Input
                                        id="cardNumber"
                                        placeholder="1234 5678 9012 3456"
                                        maxLength={19}
                                    />
                                </div >
                                <div className="grid grid-cols-2 gap-4">
                                    < div className="space-y-2">
                                        < Label htmlFor="expiry">Expiry Date</Label>
                                        < Input id="expiry" placeholder="MM/YY" maxLength={5} />
                                    </div >
                                    <div className="space-y-2">
                                        < Label htmlFor="cvv">CVV</Label>
                                        < Input id="cvv" placeholder="123" maxLength={3} type="password" />
                                    </div >
                                </div >
                                <div className="space-y-2">
                                    < Label htmlFor="cardName">Cardholder Name</Label>
                                    < Input id="cardName" placeholder="John Doe" />
                                </div >
                            </div >
                        )
                    }

                    {/* Wallet Payment Info */}
                    {
                        paymentMethod === "wallet" && (
                            < div className="space-y-4 animate-fade-in">
                                < div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                                    < p className="text-sm text-foreground">
                                        You'll be redirected to complete the payment securely through your
                                        digital wallet.
                                    </p >
                                </div >
                            </div >
                        )
                    }

                    {/* Security Badge */}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        < Check className="w-4 h-4 text-green-500" />
                        < span > Secured by 256 - bit SSL encryption</span >
                    </div >
                </div >

                {/* Action Buttons */}
                < div className="flex gap-3">
                    < Button variant="outline" onClick={onClose} className="flex-1">
                        Cancel
                    </Button >
                    <Button
                        onClick={handlePayment}
                        disabled={processing}
                        className="flex-1"
                    >
                        {
                            processing ? "Processing..." : `Pay ${price}`}
                    </Button >
                </div >
            </DialogContent >
        </Dialog >
    );
};
