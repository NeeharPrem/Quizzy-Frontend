import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { UserPlus, Mail, Lock } from "lucide-react";
import { signup } from "../../api/admin";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminSignup = () => {
    const navigate= useNavigate()
    const initialValues = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Full name is required"),
        email: Yup.string().email("Invalid email address").required("Email is required"),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm password is required"),
    });

    const handleSubmit = (values, { setSubmitting }) => {
        console.log("Form data:", values);
        const data = async ()=>{
            try {
                const response = await signup(values)
                if (response.data.messge == 'Account created'){
                  toast.error(response.data.messge)
                }else{
                    toast.success(response.data.message)
                    navigate('/admin/login')
                }
            } catch (error) {
                console.log(error)
            }
        }
        data()
        setSubmitting(false);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:scale-105">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin Signup</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched, isSubmitting }) => (
                        <Form className="space-y-4">
                            <div className="relative">
                                <UserPlus className="absolute top-3 left-3 text-gray-400" size={20} />
                                <Field
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    className={`w-full p-3 pl-10 text-gray-700 bg-gray-50 border ${errors.name && touched.name ? "border-red-500" : "border-gray-300"
                                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300`}
                                />
                                {errors.name && touched.name && (
                                    <div className="text-red-500 text-sm mt-1">{errors.name}</div>
                                )}
                            </div>
                            <div className="relative">
                                <Mail className="absolute top-3 left-3 text-gray-400" size={20} />
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    className={`w-full p-3 pl-10 text-gray-700 bg-gray-50 border ${errors.email && touched.email ? "border-red-500" : "border-gray-300"
                                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300`}
                                />
                                {errors.email && touched.email && (
                                    <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                                )}
                            </div>
                            <div className="relative">
                                <Lock className="absolute top-3 left-3 text-gray-400" size={20} />
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className={`w-full p-3 pl-10 text-gray-700 bg-gray-50 border ${errors.password && touched.password ? "border-red-500" : "border-gray-300"
                                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300`}
                                />
                                {errors.password && touched.password && (
                                    <div className="text-red-500 text-sm mt-1">{errors.password}</div>
                                )}
                            </div>
                            <div className="relative">
                                <Lock className="absolute top-3 left-3 text-gray-400" size={20} />
                                <Field
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    className={`w-full p-3 pl-10 text-gray-700 bg-gray-50 border ${errors.confirmPassword && touched.confirmPassword ? "border-red-500" : "border-gray-300"
                                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300`}
                                />
                                {errors.confirmPassword && touched.confirmPassword && (
                                    <div className="text-red-500 text-sm mt-1">{errors.confirmPassword}</div>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-50"
                            >
                                {isSubmitting ? "Signing Up..." : "Sign Up"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AdminSignup;