import { FileText, Check } from "lucide-react"

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Welcome to <span className="text-blue-600">Dav/Devs Faith</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          A faith-based platform exploring the intersection of technology and
          spirituality. Join me on this journey of discovering God&apos;s
          presence in our digital age.
        </p>
      </div>

      <div className="text-center py-16">
        <div className="text-blue-600 mb-4">
          <FileText className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Faith-Based Content Coming Soon
        </h3>
        <p className="text-gray-600 mb-8">
          Check back soon for inspiring articles exploring the intersection of
          faith and technology!
        </p>

        <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
          <h4 className="font-semibold text-gray-900 mb-2">What to Expect:</h4>
          <ul className="text-left text-gray-600 space-y-2">
            <li className="flex items-center">
              <Check className="w-4 h-4 mr-2 text-green-500" />
              Bible-based insights
            </li>
            <li className="flex items-center">
              <Check className="w-4 h-4 mr-2 text-green-500" />
              Personal testimonies
            </li>
            <li className="flex items-center">
              <Check className="w-4 h-4 mr-2 text-green-500" />
              Spiritual encouragement
            </li>
            <li className="flex items-center">
              <Check className="w-4 h-4 mr-2 text-green-500" />
              Faith & technology topics
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
