import HomeButton from "../components/HomeButton"

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        <HomeButton />
      </div>

      <article className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Privacy Policy
        </h1>
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Our Commitment to Your Privacy
            </h2>
            <p className="text-gray-600 mb-4">
              At Dav/Devs Faith, we are committed to protecting your privacy.
              This website operates as a static content platform focused on
              sharing faith-based insights and spiritual encouragement.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              What We Don&apos;t Collect
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>
                Personal information (names, email addresses, phone numbers)
              </li>
              <li>Browsing behavior or website usage patterns</li>
              <li>Cookies or tracking data</li>
              <li>Analytics or statistical data about users</li>
              <li>Any form of user-generated content or comments</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              How This Site Works
            </h3>
            <p className="text-gray-600">
              This website delivers static content directly to your browser
              without collecting or storing any personal data. We use no
              tracking tools, analytics services, or data collection mechanisms.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Contact
            </h3>
            <p className="text-gray-600">
              If you have any questions about our privacy practices, please
              contact us through our main portal at{" "}
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

          <div className="text-sm text-gray-500 border-t pt-4">
            <p>Last updated: October 22, 2025</p>
          </div>
        </div>
      </article>
    </div>
  )
}
