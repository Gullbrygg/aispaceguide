import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 py-20 text-center">
          <h1 className="text-apple-lg text-gray-900 mb-6">Din Læringssti</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto font-light">
            Følg din progresjon i å lære om ansvarlig AI-bruk
          </p>
        </div>
      </section>

      {/* Learning Path */}
      <section className="py-20 px-6 sm:px-8 max-w-4xl mx-auto">
        <h2 className="text-apple-md text-gray-900 mb-12">Læringsmål</h2>
        <div className="space-y-6">
          {[
            { step: 1, title: "Grunnleggende AI-konsepter", completed: true, link: "/guidelines" },
            { step: 2, title: "Akademisk integritet", completed: true, link: "/guidelines" },
            { step: 3, title: "Praktiske retningslinjer", completed: false, link: "/guidelines" },
            { step: 4, title: "Teste kunnskapen", completed: false, link: "/quiz" },
            { step: 5, title: "Mestring", completed: false, link: "/about/student" },
          ].map((item, idx) => (
            <Link
              key={idx}
              href={item.link}
              className={`glass p-6 rounded-2xl flex items-center gap-4 hover:shadow-lg transition-all duration-300 cursor-pointer group`}
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 transition-all ${
                  item.completed
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {item.completed ? "✓" : item.step}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {item.completed ? "Fullført" : "I arbeid"}
                </p>
              </div>
              <span className="text-gray-400 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Resources */}
      <section className="py-20 px-6 sm:px-8 bg-white/50 max-w-4xl mx-auto w-full">
        <h2 className="text-apple-md text-gray-900 mb-12">Ressurser</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: "📖", title: "Retningslinjer", href: "/guidelines" },
            { icon: "🎯", title: "Quiz", href: "/quiz" },
            { icon: "👨‍🎓", title: "Student tips", href: "/about/student" },
          ].map((resource, idx) => (
            <Link
              key={idx}
              href={resource.href}
              className="glass p-6 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 group text-center"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                {resource.icon}
              </div>
              <h3 className="font-bold text-gray-900">{resource.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Tips */}
      <section className="py-20 px-6 sm:px-8 max-w-4xl mx-auto">
        <h2 className="text-apple-md text-gray-900 mb-12">Praktiske tips 💡</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            "Be alltid om kilder når AI gir deg tall eller sitater",
            "Studer AI-retningslinjene for hver oppgave nøye",
            "Bruk AI som verktøy for læring, ikke som snarvei",
            "Verifiser alltid informasjon fra AI med etablerte kilder",
            "Finn din personlige tilnærming til ansvarlig AI-bruk",
            "Diskuter AI-etikk med medelever og lærere",
          ].map((tip, idx) => (
            <div
              key={idx}
              className="glass p-6 rounded-2xl hover:bg-white transition-all duration-300"
            >
              <p className="text-gray-900 font-light">{tip}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
