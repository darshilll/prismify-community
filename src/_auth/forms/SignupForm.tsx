/* eslint-disable @typescript-eslint/no-unused-vars */
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import {
  useCreateUserAccount,
  useSignInAccount,
  useUserConfirmation,
  useUserVerification,
} from "@/lib/react-query/queriesAndMutation";

import { SignupValidation } from "@/lib/validation";
import { useUserContext } from "@/context/AuthContext";
import Loader from "@/components/shared/Loader";

const SignupForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } =
    useCreateUserAccount();
  const { mutateAsync: signInAccount, isPending: isSigningInUser } =
    useSignInAccount();
  const { mutateAsync: userVerification } = useUserVerification();
  const { mutateAsync: userConfirmation } = useUserConfirmation();

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SignupValidation>) => {
    const newUser = await createUserAccount(values);

    if (!newUser) {
      return toast({ title: "Sign up failed. Please try again" });
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      toast({
        title: "Something went wrong.Please login your new account",
      });
    }

    const promise = await userVerification();
    if (promise) {
      return toast({ title: "Please check your email for verification." });
    }

    if (!promise) {
      return toast({ title: "Verification failed. Please try again." });
    }

    const confirmation = await userConfirmation();

    if (confirmation) {
      navigate("/");
    }

    if (!confirmation) {
      return toast({ title: "confirmation failed. Please try again." });
    }
    const isLoggedin = await checkAuthUser();

    if (isLoggedin) {
      form.reset();

      navigate("/");
    } else {
      return toast({ title: "Login failed. Please try again." });
    }
  };

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col ">
        <img src="/assets/Images/logondtext.png" alt="logo" width={230} />
        <h2 className="prismify p-4 -mt-4">
          Sign up to see photos and videos from your friends.
        </h2>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 xl:w-80 w-64"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    className="shad-input"
                    {...field}
                    placeholder="Email"
                  />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="shad-input"
                    {...field}
                    placeholder="Name"
                  />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="shad-input"
                    {...field}
                    placeholder="Username"
                  />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="shad-input"
                    {...field}
                    placeholder="Password"
                  />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary">
            {isCreatingAccount || isSigningInUser || isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader />
              </div>
            ) : (
              "Sign up"
            )}
          </Button>
        </form>
      </div>
      <p className="text-small-regular text-light-3 text-center font-sans mt-4">
        Already have an account?
        <Link
          to="/sign-in"
          className="text-primary-600 text-small-semibold ml-1"
        >
          Log in
        </Link>
      </p>
    </Form>
  );
};

export default SignupForm;
