import { FaGithub } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-cyan-300 via-blue-500 to-indigo-300">
        <section className="flex justify-center items-center gap-5 py-8">
          <p className="text-black text-lg">© 2025 Brayan Velasquez</p>
          <a href="https://github.com/BryantGG77" target="_blank">
            <FaGithub className="text-2xl cursor-pointer"/>
          </a>
        </section>
    </footer>
  )
}
