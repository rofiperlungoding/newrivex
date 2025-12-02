const TermsOfService = () => {
    return (
        <div className="max-w-4xl mx-auto pt-10 pb-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-8">Terms of Service</h1>
            <p className="text-secondary mb-12">Last updated: January 1, 2025</p>

            <div className="space-y-8 text-secondary leading-relaxed">
                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
                    <p>
                        By accessing our website, you agree to be bound by these Terms of Service and to comply with all applicable laws and regulations.
                        If you do not agree with these terms, you are prohibited from using or accessing this site or using any other services provided by Rivex.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">2. Intellectual Property Rights</h2>
                    <p>
                        Other than the content you own, under these Terms, Rivex and/or its licensors own all the intellectual property rights and materials contained in this Website.
                        You are granted limited license only for purposes of viewing the material contained on this Website.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">3. Restrictions</h2>
                    <p>
                        You are specifically restricted from all of the following:
                    </p>
                    <ul className="list-disc pl-6 mt-4 space-y-2">
                        <li>publishing any Website material in any other media;</li>
                        <li>selling, sublicensing and/or otherwise commercializing any Website material;</li>
                        <li>publicly performing and/or showing any Website material;</li>
                        <li>using this Website in any way that is or may be damaging to this Website;</li>
                        <li>using this Website in any way that impacts user access to this Website;</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">4. Limitation of Liability</h2>
                    <p>
                        In no event shall Rivex, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract.
                        Rivex, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">5. Governing Law & Jurisdiction</h2>
                    <p>
                        These Terms will be governed by and interpreted in accordance with the laws of the State of Indonesia, and you submit to the non-exclusive jurisdiction of the state and federal courts located in Indonesia for the resolution of any disputes.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default TermsOfService;
