import { motion } from "framer-motion";
import { ExternalLink, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TeamMember {
  id: string;
  name: string;
  expertise: string[];
  portfolio: string;
  education: string;
  techStack: string[];
  email: string;
  available: boolean;
}

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
}

export function TeamMemberCard({ member, index }: TeamMemberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="border border-border bg-card p-8 hover:border-foreground/20 transition-colors"
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold tracking-tight mb-2">{member.name}</h3>
          <p className="text-sm text-muted-foreground">{member.education}</p>
        </div>
        {member.available && (
          <span className="text-xs px-3 py-1 bg-foreground text-background font-medium">
            Available
          </span>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
            Expertise
          </p>
          <div className="flex flex-wrap gap-2">
            {member.expertise.map((skill) => (
              <span
                key={skill}
                className="text-sm px-3 py-1 border border-border"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
            Tech Stack
          </p>
          <p className="text-sm">{member.techStack.join(", ")}</p>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            variant="default"
            size="sm"
            className="flex-1"
            onClick={() => window.open(`mailto:${member.email}`, "_blank")}
          >
            <Mail className="h-4 w-4 mr-2" />
            Contact
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => window.open(member.portfolio, "_blank")}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Portfolio
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
