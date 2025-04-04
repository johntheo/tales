"use client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface TrustSecurityModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TrustSecurityModal({ open, onOpenChange }: TrustSecurityModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Trust and Security</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 text-foreground">
          <p>
            At [tales], your trust is our priority. We are committed to ensuring the highest standards of security and
            privacy for all your data. Here's how we protect and secure your information:
          </p>

          <div>
            <h3 className="font-semibold mb-1">Data Encryption:</h3>
            <p>
              All data transmitted to and from our servers is encrypted using industry-standard SSL/TLS protocols. This
              ensures that your information is protected during transmission. We employ advanced encryption techniques
              to secure your data at rest, ensuring that your presentations and personal information are always safe.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-1">Privacy Protection:</h3>
            <p>
              Your data is your own. We do not share, sell, or trade your information with third parties without your
              explicit consent. Our privacy policy outlines the types of data we collect, how we use it, and your rights
              regarding your personal information. You can read our full [Privacy Policy here].
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-1">Secure Storage:</h3>
            <p>
              Our servers are hosted in top-tier, secure data centers with 24/7 monitoring, access controls, and regular
              security audits. We regularly update our infrastructure and security practices to protect against
              vulnerabilities and threats.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-1">Access Control:</h3>
            <p>
              We implement strict access controls to ensure that only authorized personnel can access your data. User
              accounts are protected with robust authentication mechanisms, including multi-factor authentication (MFA)
              for added security.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-1">Regular Audits and Compliance:</h3>
            <p>
              We undergo regular security audits and assessments to ensure compliance with industry standards and best
              practices. We are committed to maintaining compliance with relevant data protection regulations, including
              GDPR and CCPA.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-1">Continuous Improvement:</h3>
            <p>
              Security is an ongoing priority for us. We continuously monitor and improve our security measures to adapt
              to evolving threats and ensure your data remains secure.
            </p>
            <p>
              By providing this information, you reassure users about the safety and privacy of their data, building
              trust in your platform. If you need any adjustments or additional information, feel free to let me know!
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} className="w-full">
            Understand
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

