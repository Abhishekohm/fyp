import { useState } from "react";
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogContent, Dialog } from "@/components/ui/dialog";

export default function resetPass({onClose}) {

    const [userName, setUserName] = useState("");

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // Logic to handle form submission (e.g., sending reset email)
        console.log(userName);

        try {
            const response = await fetch(`https://fypbackend-production-d00d.up.railway.app/api/auth/resetPassword/?username=${userName}`, {
                method: 'GET',
                // headers: {
                //     'Content-Type': 'application/json',
                // },
            });
            if (response.ok) {
                console.log('Email sent successfully!');
                window.location.href = '/login';
            } else {
                console.error('Failed to send mail!!:', await response.text());
            }
        } catch (error) {
            console.error('Error during reset password:', error);
        }

        onClose();
    };

    const handleClose = () => {
        // Close the dialog
        onClose();
    };

    return (
        <Dialog className="justify-center" open>
            <div className="bg-opacity-50" />
            <DialogContent className="p-0">
                <Card as="form" className="w-[400px]">
                    <CardHeader className="p-4">
                        <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
                        <CardDescription>Enter your email to reset your password</CardDescription>
                        <Button className="absolute top-2 right-2" variant="transparent" onClick={onClose}>X</Button>
                    </CardHeader>
                    <CardContent className="p-4">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input placeholder="User Name" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                            </div>
                            <Button className="w-full" onClick={handleFormSubmit} type="submit">
                                Send reset email
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </DialogContent>
        </Dialog>
    )
}
