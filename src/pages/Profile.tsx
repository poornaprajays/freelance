import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Mail } from "lucide-react";
import { useParams, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import teamData from "@/data/team.json";

export default function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const member = teamData.find((m) => m.id === id);

  if (!member) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Member not found</h2>
          <Button onClick={() => navigate("/")}>Return to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </header>

      {/* Profile Hero */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row gap-12 items-start"
          >
            <img
              src={member.photo}
              alt={member.name}
              className="w-48 h-48 border border-border bg-muted"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight mb-3">
                    {member.name}
                  </h1>
                  <p className="text-lg text-muted-foreground mb-2">
                    {member.education}
                  </p>
                </div>
                {member.available && (
                  <span className="text-xs px-4 py-2 bg-foreground text-background font-medium">
                    Available
                  </span>
                )}
              </div>

              <p className="text-base leading-relaxed mb-8 max-w-3xl">
                {member.bio}
              </p>

              <div className="space-y-6 mb-8">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                    Expertise
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((skill) => (
                      <span
                        key={skill}
                        className="text-sm px-4 py-2 border border-border"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                    Tech Stack
                  </p>
                  <p className="text-base">{member.techStack.join(", ")}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="default"
                  onClick={() => window.open(`mailto:${member.email}`, "_blank")}
                  className="gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Contact
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open(member.portfolio, "_blank")}
                  className="gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Portfolio
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Work History */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold tracking-tight mb-8">
              Past Work & Projects
            </h2>

            <div className="space-y-6">
              {member.workHistory.map((work, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="border border-border bg-card p-8 hover:border-foreground/20 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold tracking-tight mb-2">
                        {work.projectName}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {work.company}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {work.duration}
                    </span>
                  </div>

                  <p className="text-base leading-relaxed mb-6">
                    {work.description}
                  </p>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(work.link, "_blank")}
                    className="gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Project
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
