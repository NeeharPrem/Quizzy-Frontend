import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Mail, Lock } from "lucide-react";
import { login } from "../../api/admin";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminLogin } from "../../store/slice/quizslice.js";

const AdminLogin = () => {
    const navigate = useNavigate()
    const dispatch= useDispatch()
    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email address").required("Email is required"),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),
    });

    const handleSubmit = (values, { setSubmitting }) => {
        console.log("Form data:", values);
        const data = async () => {
            try {
                const response = await login(values)
                console.log(response)
                if (response.status==200) {
                    toast.success(response.data.message)
                    dispatch(adminLogin(response.data.userData))
                    navigate('/admin')
                } else {
                    toast.error(response.data.messge)
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
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin Login</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched, isSubmitting }) => (
                        <Form className="space-y-4">
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
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-50"
                            >
                                {isSubmitting ? "Vefifying..." : "Log In"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AdminLogin;