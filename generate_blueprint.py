#!/usr/bin/env python3
"""
RxAssist — Premium Investor-Ready Strategic Blueprint (Updated)
High-end, clean, modern pharmaceutical tech document
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch, mm, cm
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY, TA_RIGHT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle,
    Image, KeepTogether, HRFlowable, ListFlowable, ListItem
)
from reportlab.pdfgen import canvas
from reportlab.lib import colors
import os

# Brand Colors (matching website)
VOID = HexColor('#0A0C14')
ELEVATED = HexColor('#11151F')
SURFACE = HexColor('#1A2030')
TEXT_PRIMARY = HexColor('#F8FAFC')
TEXT_SECONDARY = HexColor('#94A3B8')
ACCENT_CYAN = HexColor('#22D3EE')
ACCENT_EMERALD = HexColor('#34D399')
ACCENT_INDIGO = HexColor('#6366F1')
BORDER = HexColor('#334155')

# Page setup
PAGE_WIDTH, PAGE_HEIGHT = A4
LEFT_MARGIN = 0.75 * inch
RIGHT_MARGIN = 0.75 * inch
TOP_MARGIN = 0.7 * inch
BOTTOM_MARGIN = 0.7 * inch

def create_styles():
    styles = getSampleStyleSheet()
    
    # Cover Title
    styles.add(ParagraphStyle(
        name='CoverTitle',
        fontName='Helvetica-Bold',
        fontSize=32,
        leading=36,
        textColor=TEXT_PRIMARY,
        alignment=TA_CENTER,
        spaceAfter=8
    ))
    
    styles.add(ParagraphStyle(
        name='CoverSubtitle',
        fontName='Helvetica',
        fontSize=14,
        leading=18,
        textColor=ACCENT_CYAN,
        alignment=TA_CENTER,
        spaceAfter=6
    ))
    
    styles.add(ParagraphStyle(
        name='SectionHeader',
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=TEXT_PRIMARY,
        spaceBefore=22,
        spaceAfter=10,
        borderPadding=4
    ))
    
    styles.add(ParagraphStyle(
        name='SubHeader',
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=16,
        textColor=ACCENT_CYAN,
        spaceBefore=14,
        spaceAfter=6
    ))
    
    styles.add(ParagraphStyle(
        name='BodyCustom',
        fontName='Helvetica',
        fontSize=10,
        leading=14.5,
        textColor=TEXT_PRIMARY,
        alignment=TA_JUSTIFY,
        spaceAfter=8
    ))
    
    styles.add(ParagraphStyle(
        name='BodyMuted',
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=TEXT_SECONDARY,
        alignment=TA_JUSTIFY,
        spaceAfter=8
    ))
    
    styles.add(ParagraphStyle(
        name='BulletText',
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=TEXT_PRIMARY,
        leftIndent=16,
        spaceAfter=4
    ))
    
    styles.add(ParagraphStyle(
        name='StatNumber',
        fontName='Helvetica-Bold',
        fontSize=26,
        leading=28,
        textColor=ACCENT_EMERALD,
        alignment=TA_CENTER
    ))
    
    styles.add(ParagraphStyle(
        name='Footer',
        fontName='Helvetica',
        fontSize=8,
        textColor=TEXT_SECONDARY,
        alignment=TA_CENTER
    ))
    
    styles.add(ParagraphStyle(
        name='PhaseTitle',
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=15,
        textColor=ACCENT_CYAN,
        spaceBefore=4,
        spaceAfter=3
    ))
    
    return styles

def draw_header_footer(canvas, doc):
    canvas.saveState()
    
    # Top accent line
    canvas.setStrokeColor(ACCENT_CYAN)
    canvas.setLineWidth(1.5)
    canvas.line(LEFT_MARGIN, PAGE_HEIGHT - 0.45*inch, PAGE_WIDTH - RIGHT_MARGIN, PAGE_HEIGHT - 0.45*inch)
    
    # Footer
    canvas.setFont('Helvetica', 8)
    canvas.setFillColor(TEXT_SECONDARY)
    canvas.drawString(LEFT_MARGIN, 0.4*inch, "RxAssist Strategic Blueprint  |  Private & Confidential  |  May 2026")
    canvas.drawRightString(PAGE_WIDTH - RIGHT_MARGIN, 0.4*inch, f"Page {doc.page}")
    
    # Bottom line
    canvas.setStrokeColor(BORDER)
    canvas.setLineWidth(0.5)
    canvas.line(LEFT_MARGIN, 0.55*inch, PAGE_WIDTH - RIGHT_MARGIN, 0.55*inch)
    
    canvas.restoreState()

def create_blueprint():
    output_path = "/home/workdir/artifacts/rxassist-landing/RxAssist_Strategic_Blueprint_2026.pdf"
    
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=LEFT_MARGIN,
        rightMargin=RIGHT_MARGIN,
        topMargin=TOP_MARGIN + 0.15*inch,
        bottomMargin=BOTTOM_MARGIN + 0.2*inch
    )
    
    styles = create_styles()
    story = []
    
    # ========== COVER PAGE ==========
    story.append(Spacer(1, 1.8*inch))
    
    # Logo simulation (text based for PDF)
    story.append(Paragraph('<font color="#22D3EE" size="11"><b>Rx</b></font><font color="#F8FAFC" size="11">Assist</font>', 
                          ParagraphStyle('Logo', alignment=TA_CENTER, fontName='Helvetica-Bold', fontSize=11, leading=14)))
    story.append(Spacer(1, 0.35*inch))
    
    story.append(Paragraph("RxAssist", styles['CoverTitle']))
    story.append(Paragraph("Closing the Medication Safety Gap Across Africa", styles['CoverSubtitle']))
    story.append(Spacer(1, 0.25*inch))
    
    story.append(HRFlowable(width="35%", thickness=1, color=ACCENT_CYAN, spaceBefore=4, spaceAfter=18, hAlign='CENTER'))
    
    story.append(Paragraph("<b>Strategic Business Infrastructure &amp; Global Impact Blueprint</b>", 
                          ParagraphStyle('SubMain', fontName='Helvetica', fontSize=11, leading=15, 
                                        textColor=TEXT_SECONDARY, alignment=TA_CENTER)))
    story.append(Spacer(1, 0.15*inch))
    story.append(Paragraph("Targeting UN SDG 3: Good Health &amp; Well-being", 
                          ParagraphStyle('SDG', fontName='Helvetica', fontSize=9, textColor=ACCENT_EMERALD, alignment=TA_CENTER)))
    
    story.append(Spacer(1, 1.6*inch))
    
    story.append(Paragraph("May 2026", ParagraphStyle('Date', fontName='Helvetica', fontSize=10, 
                                                      textColor=TEXT_SECONDARY, alignment=TA_CENTER)))
    story.append(Paragraph("Private &amp; Confidential", ParagraphStyle('Conf', fontName='Helvetica-Bold', fontSize=9, 
                                                                        textColor=ACCENT_CYAN, alignment=TA_CENTER, spaceBefore=4)))
    
    story.append(PageBreak())
    
    # ========== EXECUTIVE SUMMARY ==========
    story.append(Paragraph("1. Executive Summary", styles['SectionHeader']))
    
    story.append(Paragraph(
        "RxAssist is an AI-powered pharmaceutical middleware platform engineered to solve the self-medication crisis across Sub-Saharan Africa. "
        "In a region where <b>70% of medications are purchased without professional consultation</b> and <b>one in six drugs are counterfeit</b>, "
        "RxAssist delivers a trusted 24/7 digital pharmacist directly to the smartphone in every pocket.",
        styles['BodyCustom']
    ))
    
    story.append(Paragraph(
        "By combining high-precision computer vision for instant counterfeit detection with natural language processing that communicates in local languages "
        "(Yoruba, Hausa, Igbo, and Pidgin), we aim to <b>reduce medication errors by up to 40%</b> while scaling safe pharmaceutical access to "
        "<b>40 million underserved smartphone users</b>. The platform is built offline-first, ensuring functionality even in the most connectivity-challenged regions.",
        styles['BodyCustom']
    ))
    
    story.append(Paragraph(
        "RxAssist is more than an app — it is foundational infrastructure for medication safety, designed to create measurable public health impact while building a sustainable, scalable business.",
        styles['BodyMuted']
    ))
    
    # Key metrics box
    story.append(Spacer(1, 0.2*inch))
    
    metrics_data = [
        ['70%', '1 in 6', '40%', '40M'],
        ['Medications bought\nwithout guidance', 'Drugs that are\ncounterfeit', 'Target reduction\nin medication errors', 'Initial smartphone\nusers targeted']
    ]
    
    metrics_table = Table(metrics_data, colWidths=[3.8*cm]*4)
    metrics_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), SURFACE),
        ('TEXTCOLOR', (0, 0), (-1, 0), ACCENT_EMERALD),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 18),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('FONTNAME', (0, 1), (-1, 1), 'Helvetica'),
        ('FONTSIZE', (0, 1), (-1, 1), 8),
        ('TEXTCOLOR', (0, 1), (-1, 1), TEXT_SECONDARY),
        ('BACKGROUND', (0, 1), (-1, 1), ELEVATED),
        ('TOPPADDING', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ('BOX', (0, 0), (-1, -1), 0.5, BORDER),
        ('LINEBELOW', (0, 0), (-1, 0), 1, ACCENT_CYAN),
    ]))
    story.append(metrics_table)
    
    story.append(PageBreak())
    
    # ========== THE CHALLENGE ==========
    story.append(Paragraph("2. The Pharmaceutical Crisis in Africa", styles['SectionHeader']))
    
    story.append(Paragraph("2.1 The Consultation Deficit", styles['SubHeader']))
    story.append(Paragraph(
        "In rural Nigeria, the pharmacist-to-patient ratio exceeds <b>1:10,000</b>. This extreme scarcity forces patients to rely on local vendors and informal sellers who often lack formal clinical training. The result is a pervasive culture of unguided self-medication — one of the most significant yet under-addressed drivers of poor health outcomes on the continent.",
        styles['BodyCustom']
    ))
    
    story.append(Paragraph("2.2 The Counterfeit Epidemic", styles['SubHeader']))
    story.append(Paragraph(
        "Counterfeit and substandard drugs account for approximately <b>16.7% of the regional pharmaceutical market</b>. These \"silent killers\" do more than fail to treat illness — they actively contribute to antimicrobial resistance (AMR), treatment failure, and preventable deaths. The economic and human cost is staggering.",
        styles['BodyCustom']
    ))
    
    story.append(Paragraph(
        "This is not merely a supply or access problem. It is fundamentally a <b>trust, verification, and guidance</b> problem. Existing solutions have failed to scale because they do not address the last mile of patient decision-making in low-resource, low-connectivity environments.",
        styles['BodyMuted']
    ))
    
    # ========== SOLUTION ==========
    story.append(Paragraph("3. The RxAssist Solution", styles['SectionHeader']))
    
    story.append(Paragraph(
        "RxAssist is an AI-powered middleware layer that sits between the patient and the complex pharmaceutical ecosystem. It transforms every smartphone into a trusted source of medication intelligence.",
        styles['BodyCustom']
    ))
    
    story.append(Paragraph("Core Capabilities", styles['SubHeader']))
    
    capabilities = [
        "<b>Computer Vision Counterfeit Detection (CVCD)</b> — High-resolution smartphone scanning instantly analyzes packaging security features, serial numbers, holograms, and batch codes against a proprietary manufacturer-verified database. Users receive a clear Trust Score within seconds.",
        "<b>Local-Language NLP Engine</b> — Healthcare guidance is only effective when understood. RxAssist delivers evidence-based dosage instructions, side-effect warnings, and adherence support in Yoruba, Hausa, Igbo, Pidgin English, and additional languages as we expand.",
        "<b>Offline-First Architecture</b> — The \"Sync-and-Save\" system allows core functionality — including interaction databases, adherence schedules, and basic guidance — to remain fully operational without cellular or internet connectivity.",
        "<b>Intelligent Adherence &amp; Safety Layer</b> — Personalized reminders, real-time drug-drug and drug-food interaction alerts, and smart nudges to complete antibiotic courses help protect both individual patients and broader public health from rising antimicrobial resistance."
    ]
    
    for cap in capabilities:
        story.append(Paragraph("• " + cap, styles['BulletText']))
        story.append(Spacer(1, 3))
    
    story.append(PageBreak())
    
    # ========== IMPACT ==========
    story.append(Paragraph("4. Operational Impact Metrics", styles['SectionHeader']))
    
    story.append(Paragraph(
        "RxAssist is engineered for measurable, reportable public health outcomes. Our primary success indicators are grounded in the realities of the region:",
        styles['BodyCustom']
    ))
    
    impact_items = [
        "<b>Adherence Elevation:</b> Moving regional adherence rates from the current average of ~50% to a target of 75% through intelligent, context-aware reminders and support.",
        "<b>Error Mitigation:</b> Reducing drug-to-drug and drug-to-food interaction errors by up to 40% via real-time clinical decision support at the point of consumption.",
        "<b>AMR Combat:</b> Systematically educating users on the critical importance of completing full antibiotic courses, directly contributing to the global fight against superbugs.",
        "<b>Verification at Scale:</b> Empowering millions of citizens to instantly verify medication authenticity, dramatically reducing the circulation and consumption of counterfeit drugs."
    ]
    
    for item in impact_items:
        story.append(Paragraph("• " + item, styles['BulletText']))
    
    story.append(Spacer(1, 0.25*inch))
    story.append(Paragraph(
        "These metrics are not theoretical. They are the direct result of solving the precise friction points that currently drive poor outcomes: lack of verification, lack of understanding, and lack of ongoing support.",
        styles['BodyMuted']
    ))
    
    # ========== BUSINESS MODEL ==========
    story.append(Paragraph("5. Sustainable Revenue &amp; Monetization", styles['SectionHeader']))
    
    story.append(Paragraph(
        "RxAssist employs a diversified, impact-aligned revenue model designed for long-term sustainability and rapid scalability across emerging markets.",
        styles['BodyCustom']
    ))
    
    story.append(Paragraph("5.1 B2B Pharmaceutical Partnerships", styles['SubHeader']))
    story.append(Paragraph(
        "Licensed pharmacies, hospital groups, and clinic networks subscribe to advanced dashboards that provide real-time visibility into patient adherence, medication history, and population-level insights. Higher patient retention and improved clinical outcomes justify the monthly SaaS subscription.",
        styles['BodyCustom']
    ))
    
    story.append(Paragraph("5.2 Telemedicine Consultation Fees", styles['SubHeader']))
    story.append(Paragraph(
        "While core AI guidance remains free for basic use, users can instantly escalate to licensed pharmacists for video or audio consultations at a transparent flat fee. This creates meaningful gig-economy opportunities for pharmacists across the continent while generating high-margin revenue.",
        styles['BodyCustom']
    ))
    
    story.append(Paragraph("5.3 Aggregate Data Insights", styles['SubHeader']))
    story.append(Paragraph(
        "Anonymized, aggregated data on drug usage patterns, counterfeit hotspots, and adherence behaviors provides invaluable intelligence to NGOs, ministries of health, and global health organizations. This data-for-impact revenue stream aligns incentives toward public good.",
        styles['BodyCustom']
    ))
    
    story.append(PageBreak())
    
    # ========== ROADMAP ==========
    story.append(Paragraph("6. Roadmap to 2030", styles['SectionHeader']))
    
    phases = [
        ("Phase 1: Nigeria Pilot (2026–2027)", 
         "Focus on Nigeria’s 40 million smartphone users. Prioritize Lagos urban centers and strategic rural clusters in the North. Deep training of NLP models for major Nigerian languages. Establish foundational B2B relationships with leading pharmacy chains."),
        ("Phase 2: West African Expansion (2028–2029)", 
         "Scale to Ghana and Côte d’Ivoire. Expand language coverage to local dialects. Strengthen partnerships with regional health systems and introduce enhanced telemedicine features. Target 2.5+ million active users."),
        ("Phase 3: Continental Integration (2030+)", 
         "Pan-African rollout. Capture a significant share of the $65 billion African pharmaceutical market. Position RxAssist as the default safety and guidance layer for medication use across the continent. Target 25+ million users.")
    ]
    
    for title, desc in phases:
        story.append(Paragraph(f"<b>{title}</b>", styles['PhaseTitle']))
        story.append(Paragraph(desc, styles['BodyCustom']))
    
    # ========== GLOBAL ALIGNMENT ==========
    story.append(Paragraph("7. Global Alignment &amp; Grant Eligibility", styles['SectionHeader']))
    
    story.append(Paragraph(
        "RxAssist is strategically positioned to attract impact-focused capital from the world’s leading global health and innovation funders.",
        styles['BodyCustom']
    ))
    
    story.append(Paragraph(
        "<b>UN Sustainable Development Goals:</b> Directly advances SDG 3 (Good Health &amp; Well-being), SDG 8 (Decent Work &amp; Economic Growth), and SDG 9 (Industry, Innovation &amp; Infrastructure).",
        styles['BodyCustom']
    ))
    
    story.append(Paragraph(
        "<b>Strategic Alignment:</b> Our model resonates strongly with the mandates of the Bill &amp; Melinda Gates Foundation, Grand Challenges Canada, the Tony Elumelu Foundation, and similar organizations focused on scalable, culturally intelligent solutions that create both health impact and economic opportunity.",
        styles['BodyCustom']
    ))
    
    story.append(Paragraph(
        "We create jobs for pharmacists, generate actionable public health data, and save lives at population scale — a rare combination of financial sustainability and transformative social return.",
        styles['BodyMuted']
    ))
    
    # ========== TEAM ==========
    story.append(Paragraph("8. Leadership", styles['SectionHeader']))
    
    story.append(Paragraph(
        "<b>Nathaniel Friday — Founder</b>",
        ParagraphStyle('FounderName', fontName='Helvetica-Bold', fontSize=11, textColor=TEXT_PRIMARY, spaceBefore=6)
    ))
    story.append(Paragraph(
        "Nathaniel founded RxAssist to close one of healthcare’s most dangerous and overlooked gaps: the moment between receiving a prescription and safely completing treatment. "
        "With a deep commitment to Sub-Saharan Africa and a conviction that frontier AI must serve the hardest-to-reach populations, he is building the foundational infrastructure for safe, dignified medication use at continental scale.",
        styles['BodyCustom']
    ))
    
    story.append(Spacer(1, 0.3*inch))
    
    # Closing statement
    story.append(HRFlowable(width="100%", thickness=0.5, color=BORDER, spaceBefore=10, spaceAfter=14))
    
    story.append(Paragraph(
        "<i>RxAssist is not simply a product. It is the beginning of a new standard for pharmaceutical trust in Africa — one patient, one verification, one completed course at a time.</i>",
        ParagraphStyle('Closing', fontName='Helvetica-Oblique', fontSize=10, leading=14, 
                      textColor=TEXT_SECONDARY, alignment=TA_CENTER, spaceBefore=8)
    ))
    
    story.append(Spacer(1, 0.4*inch))
    story.append(Paragraph("Contact: nathanial.f@rxassist.pro  |  linkedin.com/in/rxassist", 
                          ParagraphStyle('Contact', fontName='Helvetica', fontSize=9, 
                                        textColor=ACCENT_CYAN, alignment=TA_CENTER)))
    
    # Build PDF
    doc.build(story, onFirstPage=draw_header_footer, onLaterPages=draw_header_footer)
    
    print(f"✅ Premium blueprint generated: {output_path}")
    return output_path

if __name__ == "__main__":
    create_blueprint()