import { motion } from "framer-motion";
import { ExternalLink, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

interface TeamMember {
  id: string;
  name: string;
  photo: string;
  expertise: string[];
  portfolio: string;
  education: string;
  techStack: string[];
  email: string;
  available: boolean;
  bio?: string;
}

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
  variant?: "default" | "featured";
}

export function TeamMemberCard({ member, index, variant = "default" }: TeamMemberCardProps) {
  const navigate = useNavigate();

  if (variant === "featured") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        onClick={() => navigate(`/profile/${member.id}`)}
        className="border border-border bg-card hover:border-foreground/20 transition-all cursor-pointer group"
      >
        <div className="flex flex-row">
          <div className="flex-1 p-6 md:p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-2">
                  {member.name}
                </h2>
                <p className="text-sm text-muted-foreground mb-3">
                  {member.education}
                </p>
              </div>
              {member.available && (
                <span className="text-xs px-3 py-1 bg-foreground text-background font-medium whitespace-nowrap">
                  Available
                </span>
              )}
            </div>

            {member.bio && (
              <p className="text-sm leading-relaxed mb-4 text-muted-foreground line-clamp-2">
                {member.bio}
              </p>
            )}

            <div className="space-y-4 mb-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Expertise
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {member.expertise.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-3 py-1 border border-border"
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
                <p className="text-sm line-clamp-1">{member.techStack.join(", ")}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
              <span>View Full Profile</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>

          <div className="w-32 sm:w-40 md:w-64 shrink-0">
            <img
              src={member.photo}
              alt={member.name}
              className="w-full h-full object-cover border-l border-border"
            />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onClick={() => navigate(`/profile/${member.id}`)}
      className="border border-border bg-card p-8 hover:border-foreground/20 transition-colors cursor-pointer group"
    >
      <div className="flex items-start gap-6 mb-6">
        <img
          src={member.photo}
          alt={member.name}
          className="w-20 h-20 border border-border bg-muted"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between">
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
        </div>
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
            onClick={(e) => {
              e.stopPropagation();
              window.open(`mailto:${member.email}`, "_blank");
            }}
          >
            <Mail className="h-4 w-4 mr-2" />
            Contact
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              window.open(member.portfolio, "_blank");
            }}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Portfolio
          </Button>
        </div>
      </div>
    </motion.div>
  );
}