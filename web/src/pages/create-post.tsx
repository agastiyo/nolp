import { Box, Button } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useCreatePostMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";
import { withApollo } from "../utils/withApollo";

const CreatePost: React.FC<{}> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const [createPost] = useCreatePostMutation();
  return (
    <div className="relative flex flex-col min-h-screen bg-white">
      <div className="relative md:h-screen md:flex">
        <div className="relative flex flex-col items-center justify-center h-screen px-2 lg:h-auto w-full">
          <div className="w-full px-4 py-8 pt-5 mx-3 bg-white sm:w-96">
            <Formik
              initialValues={{ title: "", text: "" }}
              onSubmit={async (values) => {
                const { errors } = await createPost({
                  variables: { input: values },
                  update: (cache) => {
                    cache.evict({ fieldName: "posts:{}" });
                  },
                });
                if (!errors) {
                  console.log(errors);
                  router.push("/");
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div>
                    <label className="form_label" htmlFor="title">
                      Title
                    </label>
                    <div className="form_input_container">
                      <input
                        id="title"
                        name="title"
                        placeholder="title"
                        className="form_input mb-3"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="form_label" htmlFor="body">
                      Body
                    </label>
                    <div className="form_input_container">
                      <input
                        id="body"
                        name="body"
                        placeholder="text..."
                        className="form_input mb-3"
                      />
                    </div>
                  </div>
                  <button type="submit" className="form_red_button w-full">
                    Create post
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withApollo({ ssr: false })(CreatePost);
