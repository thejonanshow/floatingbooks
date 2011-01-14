class Book < ActiveRecord::Base
  belongs_to :user
  belongs_to :checked_out_to, :class_name => 'User'

  validates_presence_of :isbn

  def populate_data_from_google
    google_data = get_google_data
    if google_data['feed'] && google_data['feed']['entry']
      self.author = google_data['feed']['entry']['creator']
      self.title = google_data['feed']['entry']['title'].first
      self.description = google_data['feed']['entry']['description']
      self.pages = google_data['feed']['entry']['format'].first
      self.subject = google_data['feed']['entry']['subject']
      self.publisher = google_data['feed']['entry']['publisher']
      self.language = google_data['feed']['entry']['language']
      self.date = google_data['feed']['entry']['date']
      save
    end
  end

  def get_google_data
    url = URI.parse("http://books.google.com/books/feeds/volumes?q=isbn:#{URI.encode(isbn)}")
    net_object = Net::HTTP.get_response url
    Hash.from_xml(net_object.body)
  end

  def qrcode
    "http://chart.googleapis.com/chart?cht=qr&chs=250x250&chld=H|0&chl=http://floatingbooks.heroku.com/books/?isbn=#{URI.encode(isbn)}"
  end

  def get_base64_qrcode
    Base64.encode64(URI.parse(URI.encode("http://chart.googleapis.com/chart?cht=qr&chs=150x150&chld=H|0&chl=#{qrcode}")).read)
  end

  def build_label_file

    "\357\273\277<?xml version=\"1.0\" encoding=\"utf-8\"?>\r\n<DieCutLabel Version=\"8.0\" Units=\"twips\">\r\n\t<PaperOrientation>Landscape</PaperOrientation>\r\n\t<Id>Address</Id>\r\n\t<PaperName>30252 Address</PaperName>\r\n\t<DrawCommands>\r\n\t\t<RoundRectangle X=\"0\" Y=\"0\" Width=\"1581\" Height=\"5040\" Rx=\"270\" Ry=\"270\" />\r\n\t</DrawCommands>\r\n\t<ObjectInfo>\r\n\t\t<AddressObject>\r\n\t\t\t<Name>Address</Name>\r\n\t\t\t<ForeColor Alpha=\"255\" Red=\"0\" Green=\"0\" Blue=\"0\" />\r\n\t\t\t<BackColor Alpha=\"0\" Red=\"255\" Green=\"255\" Blue=\"255\" />\r\n\t\t\t<LinkedObjectName></LinkedObjectName>\r\n\t\t\t<Rotation>Rotation0</Rotation>\r\n\t\t\t<IsMirrored>False</IsMirrored>\r\n\t\t\t<IsVariable>True</IsVariable>\r\n\t\t\t<HorizontalAlignment>Left</HorizontalAlignment>\r\n\t\t\t<VerticalAlignment>Middle</VerticalAlignment>\r\n\t\t\t<TextFitMode>ShrinkToFit</TextFitMode>\r\n\t\t\t<UseFullFontHeight>True</UseFullFontHeight>\r\n\t\t\t<Verticalized>False</Verticalized>\r\n\t\t\t<StyledText>\r\n\t\t\t\t<Element>\r\n\t\t\t\t\t<String>Property of: #{name}\r\nIf found please return to:\r\n550 NW Franklin Ave. Suite 200\r\nBend, OR 97701\r\nhttp://www.g5platform.com</String>\r\n\t\t\t\t\t<Attributes>\r\n\t\t\t\t\t\t<Font Family=\"Arial\" Size=\"20\" Bold=\"False\" Italic=\"False\" Underline=\"False\" Strikeout=\"False\" />\r\n\t\t\t\t\t\t<ForeColor Alpha=\"255\" Red=\"0\" Green=\"0\" Blue=\"0\" />\r\n\t\t\t\t\t</Attributes>\r\n\t\t\t\t</Element>\r\n\t\t\t</StyledText>\r\n\t\t\t<ShowBarcodeFor9DigitZipOnly>False</ShowBarcodeFor9DigitZipOnly>\r\n\t\t\t<BarcodePosition>Suppress</BarcodePosition>\r\n\t\t\t<LineFonts>\r\n\t\t\t\t<Font Family=\"Arial\" Size=\"20\" Bold=\"False\" Italic=\"False\" Underline=\"False\" Strikeout=\"False\" />\r\n\t\t\t\t<Font Family=\"Arial\" Size=\"20\" Bold=\"False\" Italic=\"False\" Underline=\"False\" Strikeout=\"False\" />\r\n\t\t\t\t<Font Family=\"Arial\" Size=\"20\" Bold=\"False\" Italic=\"False\" Underline=\"False\" Strikeout=\"False\" />\r\n\t\t\t\t<Font Family=\"Arial\" Size=\"20\" Bold=\"False\" Italic=\"False\" Underline=\"False\" Strikeout=\"False\" />\r\n\t\t\t\t<Font Family=\"Arial\" Size=\"20\" Bold=\"False\" Italic=\"False\" Underline=\"False\" Strikeout=\"False\" />\r\n\t\t\t</LineFonts>\r\n\t\t</AddressObject>\r\n\t\t<Bounds X=\"1802\" Y=\"150\" Width=\"2985\" Height=\"1260\" />\r\n\t</ObjectInfo>\r\n\t<ObjectInfo>\r\n\t\t<ImageObject>\r\n\t\t\t<Name>Image</Name>\r\n\t\t\t<ForeColor Alpha=\"255\" Red=\"0\" Green=\"0\" Blue=\"0\" />\r\n\t\t\t<BackColor Alpha=\"0\" Red=\"255\" Green=\"255\" Blue=\"255\" />\r\n\t\t\t<LinkedObjectName></LinkedObjectName>\r\n\t\t\t<Rotation>Rotation0</Rotation>\r\n\t\t\t<IsMirrored>False</IsMirrored>\r\n\t\t\t<IsVariable>False</IsVariable>\r\n\t\t\t<Image>#{get_base64_qrcode}</Image>\r\n\t\t\t<ScaleMode>Uniform</ScaleMode>\r\n\t\t\t<BorderWidth>0</BorderWidth>\r\n\t\t\t<BorderColor Alpha=\"255\" Red=\"0\" Green=\"0\" Blue=\"0\" />\r\n\t\t\t<HorizontalAlignment>Center</HorizontalAlignment>\r\n\t\t\t<VerticalAlignment>Center</VerticalAlignment>\r\n\t\t</ImageObject>\r\n\t\t<Bounds X=\"331\" Y=\"150\" Width=\"1263.16906738281\" Height=\"1305\" />\r\n\t</ObjectInfo>\r\n</DieCutLabel>".gsub!(/[\n|\t|\r]/,"").html_safe

  end

end
