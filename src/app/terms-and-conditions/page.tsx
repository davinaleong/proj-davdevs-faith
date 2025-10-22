import HomeButton from "../components/HomeButton"

export default function TermsAndConditions() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        <HomeButton />
      </div>

      <article className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Terms and Conditions
        </h1>
        <div className="bg-white rounded-lg shadow-md p-8">
          <p className="text-gray-600 italic mb-6">
            Our Terms and Conditions are currently being prepared. Please check
            back soon for our complete terms of service.
          </p>
          <p className="text-gray-600">
            For any questions in the meantime, please contact us through our
            main portal at{" "}
            <a
              href="https://tools.davinaleong.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              tools.davinaleong.com
            </a>
          </p>
        </div>
      </article>
    </div>
  )
}
