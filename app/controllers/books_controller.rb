class BooksController < ApplicationController
  before_filter :authenticate_user!, :except => [:search, :index]

  def search
    if params[:search]
      results = Book.search_all(params[:search])
      @count = results['matches']
      @books = Book.find_all_by_id results['results'].collect { |hash| hash['docid'] }
      render :action => :results
    end
  end

  def return
    @book = Book.find_by_isbn params[:isbn]
    if @book.checked_out_to
      @book.checked_out_to = nil
      @book.save
      flash[:notice] = "Book returned!"
      redirect_to :back
    else
      flash[:notice] = "Book not checked out!"
      redirect_to :back and return
    end
  end

  def manage
  end

  def verify
    @book = Book.find params[:id]
    @book.populate_data_from_google
  end

  def confirm
    @book = Book.find params[:id]
    @book.verified = true
    @book.save
    redirect_to books_url
  end

  def fetch_data
    @book = Book.find params[:id]
    @book.populate_data_from_google
    redirect to books_url
  end

  def checkout
    @book = Book.find_by_isbn params[:isbn]
    if @book.checked_out_to
      flash[:notice] = "Book already checked out to #{@book.checked_out_to.email}"
      redirect_to :back and return
    else
      @book.checked_out_to = current_user
      @book.checked_out_at = Time.now
      @book.save
      flash[:notice] = "Book checked out!"
      redirect_to '/books/manage'
    end
  end
  # GET /books
  # GET /books.xml
  def index
    if params[:isbn]
      redirect_to book_url(Book.find_by_isbn(params[:isbn]))
      return
    end

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @books }
    end
  end

  # GET /books/1
  # GET /books/1.xml
  def show

    @book = Book.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @book }
    end
  end

  # GET /books/new
  # GET /books/new.xml
  def new
    @book = Book.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @book }
    end
  end

  # GET /books/1/edit
  def edit
    @book = current_user.books.find(params[:id])
  end

  # POST /books
  # POST /books.xml
  def create
    @book = current_user.books.new(params[:book])

    respond_to do |format|
      if @book.save
        format.html { redirect_to(verify_url(@book), :notice => 'Book was successfully created.') }
        format.xml  { render :xml => @book, :status => :created, :location => @book }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @book.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /books/1
  # PUT /books/1.xml
  def update
    @book = current_user.books.find(params[:id])

    respond_to do |format|
      if @book.update_attributes(params[:book])
        format.html { redirect_to(@book, :notice => 'Book was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @book.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /books/1
  # DELETE /books/1.xml
  def destroy
    @book = Book.find(params[:id])
    @book.destroy

    respond_to do |format|
      format.html { redirect_to(book_path('manage')) }
      format.xml  { head :ok }
    end
  end
end
