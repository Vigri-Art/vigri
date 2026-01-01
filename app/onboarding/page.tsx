import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { create_profiles } from './actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CardContent, CardHeader } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

export default function OnboardingPage() {
    return (
        <>
            <CardHeader>
                <h2>Welcome to Vigri</h2>
            </CardHeader>
            <CardContent>
                <form action={create_profiles}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel>Full Name:</FieldLabel>
                            <Input id="displayname" name="displayname" type="text" placeholder="Andres @ Vigri" required/>
                        </Field>
                        <Field>
                            <FieldLabel>Username:</FieldLabel>
                            <Input id="username" name="username" type="text" placeholder="andersthemagi" required/>
                        </Field>
                        <Field>
                            <FieldLabel>Sign up as:</FieldLabel>
                            <Alert>
                                <InfoIcon />
                                <AlertTitle>Note: Pre-Alpha Phase</AlertTitle>
                                <AlertDescription>Signups are currently only enabled for vendors to test the application. Please reach out to <Link href="mailto:andres@redmage.cc">andres@redmage.cc</Link> if you would like to sign up as an event coordinator.</AlertDescription>
                            </Alert>
                            <RadioGroup id="userType" name="userType" required>
                                <div className="flex items-center gap-3">
                                    <RadioGroupItem value="vendor" id="r1" />
                                    <Label htmlFor="r1">Vendor (i.e. Artists)</Label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <RadioGroupItem disabled value="coordinator" id="r2" />
                                    <Label htmlFor="r2">Coordinator (i.e. you run events)</Label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <RadioGroupItem disabled value="both" id="r3" />
                                    <Label htmlFor="r3">Both</Label>
                                </div>
                            </RadioGroup>
                        </Field>
                    </FieldGroup>
                    <Button type="submit">Finish Onboarding</Button>
                </form>
            </CardContent>
        </>
    );
}